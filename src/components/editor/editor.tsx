import { Button } from "@neo4j-ndl/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addQuery } from "../../features/query/querySlice"

export default function Editor() {
    const dispatch = useDispatch()
    const [ query, setQuery ] = useState<string>('MATCH (n) RETURN count(n)')

    const handleAddQueryClick = () => {
        dispatch(addQuery({
            query,
        }))
    }

    return (
        <div>
            <textarea style={{width: '100%', border: '1px solid #ccc'}} className="p-2 b-2 w-full" value={query} onChange={e => setQuery(e.target.value)}></textarea>

            <Button
                onClick={handleAddQueryClick}
            >
            ADD QUERY</Button>
        </div>
    )
}
