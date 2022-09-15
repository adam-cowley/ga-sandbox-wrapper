import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Query } from "../../features/query/querySlice"
import Frame from "./frame"

export default function Frames() {
    const queries = useSelector<RootState, Query[]>((state) => state.query.queries)

    return (
        <div style={{padding: 12}}>
            <div>{queries.length} Queries</div>

            {queries.map(query => <Frame key={query.id} query={query} />)}
        </div>
    )
}
