
import { Alert } from '@neo4j-ndl/react';
import React, { useState,  useEffect } from 'react'
import { GraphAcademyContext } from './graph-academy.context'
import { Sandbox } from './types/sandbox';
import { Driver } from 'neo4j-driver'

import { GetSandboxCredentials } from '../stages/1-get-credentials';
import { WaitForSandboxIp } from '../stages/2-wait-for-ip';
import { VerifyConnectivity } from '../stages/3-verify-connectivity';


interface GraphAcademyProviderProps {
    children: React.ReactNode | React.ReactNode[] | null;
}

export default function GraphAcademyProvider(props: GraphAcademyProviderProps) {
    const [ sandbox, setSandbox ] = useState<Sandbox>()
    const [ error, setError ] = useState<string>()
    const [ driver, setDriver ] = useState<Driver>()

    if ( error ) {
        return (
            <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Alert
                        description={error}
                        icon
                        type='danger'
                        title='Error fetching sandbox'
                    />
                </div>
            </div>
        )
    }
    
    // 1. Load Sandbox for use case
    else if ( !sandbox ) {
        return <GetSandboxCredentials
            setSandbox={setSandbox}
            setError={setError}
        />
    }

    // 2. Wait for Sandbox IP to be set
    else if ( !sandbox.ip || sandbox.ip === undefined ) {
        return <WaitForSandboxIp
            sandbox={sandbox}
            setSandbox={setSandbox}
            setError={setError}
        />
    }

    // 3. Connect and verify connectivity
    else if ( !driver ) {
        return <VerifyConnectivity
            sandbox={sandbox}
            setDriver={setDriver}
            setError={setError}
        />
    }

    // 4. Render application
    return (
        <GraphAcademyContext.Provider value={{ sandbox, driver, }}>
            {props.children}
        </GraphAcademyContext.Provider>
    )
}
