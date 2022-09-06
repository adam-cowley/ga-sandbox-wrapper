import React, { useEffect } from 'react'
import Loading from '../graphacademy/loading';
import { Sandbox } from "../graphacademy/types/sandbox"
import { getSandboxForCourse } from '../graphacademy/utils';

interface GetSandboxCredentialsProps {
    setSandbox: (sandbox: Sandbox) => void;
    setError: (error: string) => void;
}

export function GetSandboxCredentials({ setSandbox, setError }: GetSandboxCredentialsProps) {
    // graphacademy.neo4j.com/courses/app-nodejs/1-module/2-lesson/browser
    const [_course_, slug, ...other] = window.location.pathname.split('/').filter(n => n !== '')

    useEffect(() => {
        getSandboxForCourse(slug)
            .then(json => {
                setSandbox(json)
            })
            .catch(e => setError(e.message))
    }, [ slug, setError, setSandbox ])

    return <Loading message="Getting Sandbox Credentials" />
}
