import { HeroIcon, IconButton, LoadingSpinner } from "@neo4j-ndl/react";
import { useDispatch } from "react-redux";
import { useWriteCypher } from "use-neo4j";
import { Query, removeQuery } from "../../features/query/querySlice"
import ResultTable from "./result-table";
import { QueryResult, Record as Neo4jRecord, Result } from 'neo4j-driver'

interface FrameHeaderProps {
    query: Query;
}

function FrameHeader({ query }: FrameHeaderProps) {
    const dispatch = useDispatch()

    const close = () => dispatch(removeQuery(query))

    return (
        <div className="n-bg-neutral-20 n-flex n-flex-row n-justify-items-end n-content-end n-py-2" style={{justifyContent: 'end'}}>
            <IconButton clean aria-label="Close Icon" className="n-w-4 n-h-4">
                <HeroIcon iconName="XIcon"  onClick={close} />
            </IconButton>
        </div>
    )
}

interface FrameFooterProps {
    result: QueryResult;
}
function FrameFooter({ result }: FrameFooterProps) {
    return (
        <div className="n-p-4 n-mt-2 body-small">
            <span>Returned {result.records.length}</span>
            <span> row{result.records.length !== 1 ? 's': ''}</span>
            <span> in
                <span> {result.summary.resultConsumedAfter.toString()}</span>
                ms
            </span>
        </div>
    )
}

interface FrameProps {
    query: Query;
}

export default function Frame({ query }: FrameProps) {
    const { loading, result, records, error } = useWriteCypher(query.query)

    return (
        <div style={{ marginBottom: '12px', background: '#fefefe', border: '1px solid #f2f2f2' }} key={query.id}>
            <FrameHeader query={query} />

            <div className="n-divide-y n-divide-light-neutral-border-weak">
                {loading && <LoadingSpinner />}
                {/* @ts-ignore */}
                {records && <ResultTable records={records} />}
                {error && <pre>{JSON.stringify(error)}</pre>}
            </div>

            {/* @ts-ignore */}
            {result && <FrameFooter result={result as QueryResult} />}
        </div>
    )
}