import { Link, router } from '@inertiajs/react';
import {
    tableFeatures,
    useTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Bike as BikeIcon, Plus } from 'lucide-react';
import { create as bikesCreate } from '@/routes/bikes';

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
        cell: ({ row }) => {
            const status = row.original.status;

            const styles = {
                available: 'bg-green-100 text-green-700',
                rented: 'bg-yellow-100 text-yellow-700',
                maintenance: 'bg-red-100 text-red-700',
            };

            return (
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        styles[status as keyof typeof styles] ??
                        'bg-gray-100 text-gray-700'
                    }`}
                >
                    {status}
                </span>
            );
        },
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <BikeIcon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Bikes
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your bike rental fleet.
                        </p>
                    </div>
                </div>

                <Link
                    href={bikesCreate().url}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add Bike
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <table className="w-full">
                    <thead className="border-b bg-muted/40">
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
                                className="border-b transition last:border-0 hover:bg-muted/30"
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
                                    className="py-12 text-center"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            No bikes found
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Add your first bike to the fleet.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
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
                            className={`rounded-md border px-3 py-1.5 text-sm transition ${
                                link.active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-background hover:bg-muted'
                            } disabled:cursor-not-allowed disabled:opacity-50`}
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