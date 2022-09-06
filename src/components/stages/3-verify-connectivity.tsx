import { useEffect, useState } from 'react'
import { Sandbox } from "../graphacademy/types/sandbox";
import neo4j, { Driver } from 'neo4j-driver'
import Loading from "../graphacademy/loading";

interface VerifyConnectivityProps {
    sandbox: Sandbox;
    setDriver: (driver: Driver) => void;
    setError: (error: string) => void;
}

export function VerifyConnectivity({ sandbox, setDriver, setError }: VerifyConnectivityProps) {
    const maxAttempts = 20
    const [ attempt, setAttempt ] = useState<number>(1)

    useEffect(() => {
        const driver = neo4j.driver(`bolt://${sandbox.ip}:${sandbox.boltPort}`, neo4j.auth.basic(sandbox.username, sandbox.password))

        driver.verifyConnectivity()
            .then(() => {
                if (process.env.REACT_APP_DEBUG && attempt < maxAttempts) {
                    throw new Error('[FAKE ERROR]')
                }
                else {
                    setDriver(driver)
                }
            })
            .catch(e => {
                if ( attempt === maxAttempts ) {
                    setError(e.message)
                }
                else {
                    setTimeout(() => setAttempt(attempt+1), 400)
                }
            })


    }, [ sandbox, attempt, setDriver, setError ])

    let message = ``

    if ( attempt > 10 ) {
        message = 'Still trying...'
    }
    else if ( attempt > 5 ) {
        message += ' This may take a few seconds...'
    }
    else {
        message += 'Connecting to Sandbox Instance.'
    }

    return (
        <Loading
            message={message}
        />
    )
}
