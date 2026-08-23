import { Link, router } from '@inertiajs/react';
import {
    tableFeatures,
    useTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import {
    CalendarClock,
    CheckCircle2,
    Plus,
    RotateCcw,
} from 'lucide-react';

import { create as rentalsCreate } from '@/routes/rentals';
import { returnMethod as returnRental } from '@/routes/rentals';

type Rental = {
    id: number;
    bike: {
        code: string;
        brand: string;
        model: string;
    };
    user: {
        name: string;
    };
    rented_at: string;
    expected_return_at: string;
    returned_at: string | null;
    status: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type RentalsPagination = {
    data: Rental[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
};

type Props = {
    rentals: RentalsPagination;
};

const features = tableFeatures({});

export default function Index({ rentals }: Props) {
    const columns: ColumnDef<typeof features, Rental>[] = [
        {
            accessorKey: 'bike.code',
            header: 'Bike',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">
                        {row.original.bike.code}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {row.original.bike.brand}{' '}
                        {row.original.bike.model}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'user.name',
            header: 'User',
        },
        {
            accessorKey: 'rented_at',
            header: 'Rented At',
        },
        {
            accessorKey: 'expected_return_at',
            header: 'Expected Return',
        },
        {
            accessorKey: 'returned_at',
            header: 'Returned At',
            cell: ({ row }) =>
                row.original.returned_at ?? (
                    <span className="text-muted-foreground">
                        —
                    </span>
                ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status;

                if (status === 'active') {
                    return (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            Active
                        </span>
                    );
                }

                return (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Returned
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const rental = row.original;

                if (rental.status !== 'active') {
                    return (
                        <span className="text-sm text-muted-foreground">
                            —
                        </span>
                    );
                }

                const handleReturn = () => {
                    if (
                        !window.confirm(
                            `Return bike ${rental.bike.code}?`,
                        )
                    ) {
                        return;
                    }

                    router.post(
                        returnRental(rental.id).url,
                    );
                };

                return (
                    <button
                        type="button"
                        onClick={handleReturn}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition hover:bg-muted"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Return
                    </button>
                );
            },
        },
    ];

    const table = useTable({
        features,
        columns,
        data: rentals.data,
    });

    return (
        <div className="mx-auto max-w-7xl space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarClock className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Rentals
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage active and completed bike rentals.
                        </p>
                    </div>
                </div>

                <Link
                    href={rentalsCreate().url}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    New Rental
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

                        {rentals.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-12 text-center"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            No rentals found
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            Start a rental to see it here.
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
                    Showing {rentals.data.length} of {rentals.total}{' '}
                    rentals
                </p>

                <div className="flex gap-1">
                    {rentals.links.map((link, index) => (
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