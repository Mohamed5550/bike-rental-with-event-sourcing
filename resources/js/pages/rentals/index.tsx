import { Link, router } from '@inertiajs/react';
import {
    tableFeatures,
    useTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { create as rentalsCreate } from '@/routes/rentals';

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

const columns: ColumnDef<typeof features, Rental>[] = [
    {
        accessorKey: 'bike.code',
        header: 'Bike',
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
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];

export default function Index({ rentals }: Props) {
    const table = useTable({
        features,
        columns,
        data: rentals.data,
    });

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Rentals
                </h1>

                <Link
                    href={rentalsCreate().url}
                    className="rounded-md bg-black px-4 py-2 text-white"
                >
                    New Rental
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

                        {rentals.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No rentals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing {rentals.data.length} of {rentals.total} rentals
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