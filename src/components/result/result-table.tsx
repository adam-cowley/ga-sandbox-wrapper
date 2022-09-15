import { Table } from "@neo4j-ndl/react";
import { Record as Neo4jRecord } from "neo4j-driver";
import { useMemo } from "react";
import { useTable } from "react-table"
import { toNativeTypes } from "./result.utils";

interface ResultTableProps {
    records: Neo4jRecord[];
}

export default function ResultTable({ records }: ResultTableProps) {
    const columns = useMemo(
        () => records[0].keys.map(key => ({
            Header: key,
            accessor: key,
        })
        ), [records]);

    const data = useMemo(() =>
        records
            .map((row: Neo4jRecord) => toNativeTypes(row.toObject()))
            .map((row: Record<string, any>) =>
                Object.fromEntries(Object.entries(row)
                    .map(([key, value]: [string, any]) => [
                        key,
                        typeof value === 'object' ? <pre>{JSON.stringify(value, null, 2)}</pre> : value
                    ])
                )
            )
        ,
        [records])

    const tableProps = useTable({
        columns,
        data,
    } as any);

    return <Table {...tableProps} />;
}
