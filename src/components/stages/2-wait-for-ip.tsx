import React, { useEffect, useState } from 'react'
import Loading from '../graphacademy/loading';
import { Sandbox } from '../graphacademy/types/sandbox';
import { getSandboxbyHashKey } from '../graphacademy/utils';

interface WaitForSandboxIpProps {
    sandbox: Sandbox;
    setSandbox: (sandbox: Sandbox) => void;
    setError: (error: string) => void;
}

export function WaitForSandboxIp({ sandbox, setSandbox, setError }: WaitForSandboxIpProps) {
    const maxAttempts = 3
    const [ attempt, setAttempt ] = useState<number>(1)

    useEffect(() => {
        getSandboxbyHashKey(sandbox.sandboxHashKey)
            .then(json => {
                if (process.env.REACT_APP_DEBUG && attempt < maxAttempts) {
                    throw new Error('[FAKE ERROR]')
                }

                if (json.ip) {
                    setSandbox(json)
                }
                else {
                    setAttempt(attempt+1)
                }
            })
            .catch(e => {
                if (attempt === maxAttempts) {
                    setError(e.message)
                }
                else {
                    setAttempt(attempt+1)
                }
            })

    }, [ sandbox, attempt, setSandbox, setError ])


    return <Loading message='Configuring Sandbox, please wait...' />
}
