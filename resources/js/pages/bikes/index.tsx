import { Link, router } from '@inertiajs/react';
import {
    tableFeatures,
    useTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

type Bike = {
    id: number;
    code: string;
    brand: string;
    model: string;
    type: string;
    frame_size: number;
    hourly_rate: number;
    purchase_date: string;
    status: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type BikesPagination = {
    data: Bike[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
};

type Props = {
    bikes: BikesPagination;
};

const features = tableFeatures({});

const columns: ColumnDef<typeof features, Bike>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'brand',
        header: 'Brand',
    },
    {
        accessorKey: 'model',
        header: 'Model',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'frame_size',
        header: 'Frame Size',
    },
    {
        accessorKey: 'hourly_rate',
        header: 'Hourly Rate',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];

export default function Index({ bikes }: Props) {
    const table = useTable({
        features,
        columns,
        data: bikes.data,
    });

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Bikes
                </h1>

                <Link
                    href="/bikes/create"
                    className="rounded-md bg-black px-4 py-2 text-white"
                >
                    Add Bike
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                    <thead className="border-b bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-left text-sm font-medium"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <table.FlexRender
                                                    header={header}
                                                />
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b last:border-0"
                            >
                                {row.getAllCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 text-sm"
                                    >
                                        <table.FlexRender
                                            cell={cell}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {bikes.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No bikes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {bikes.data.length} of {bikes.total} bikes
                </p>

                <div className="flex gap-1">
                    {bikes.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    router.get(link.url);
                                }
                            }}
                            className={`rounded border px-3 py-1 text-sm ${
                                link.active
                                    ? 'bg-black text-white'
                                    : 'bg-white'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}