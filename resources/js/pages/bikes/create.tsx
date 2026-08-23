import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    Bike as BikeIcon,
    CalendarDays,
    DollarSign,
    Hash,
    Loader2,
    Ruler,
} from 'lucide-react';

import { store as bikesStore } from '@/routes/bikes';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        brand: '',
        model: '',
        type: 'hybrid',
        frame_size: 52,
        hourly_rate: 50,
        purchase_date: '',
        status: 'available',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(bikesStore().url);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <BikeIcon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Add Bike
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Register a new bike in your rental fleet.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Basic information */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-medium">
                            Basic Information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Enter the bike's identification and specifications.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Code */}
                        <div className="space-y-2">
                            <label
                                htmlFor="code"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                Bike Code
                            </label>

                            <input
                                id="code"
                                value={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                                placeholder="e.g. BK-001"
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />

                            {errors.code && (
                                <p className="text-sm text-destructive">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        {/* Brand */}
                        <div className="space-y-2">
                            <label
                                htmlFor="brand"
                                className="text-sm font-medium"
                            >
                                Brand
                            </label>

                            <input
                                id="brand"
                                value={data.brand}
                                onChange={(e) =>
                                    setData('brand', e.target.value)
                                }
                                placeholder="e.g. Trinx"
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />

                            {errors.brand && (
                                <p className="text-sm text-destructive">
                                    {errors.brand}
                                </p>
                            )}
                        </div>

                        {/* Model */}
                        <div className="space-y-2">
                            <label
                                htmlFor="model"
                                className="text-sm font-medium"
                            >
                                Model
                            </label>

                            <input
                                id="model"
                                value={data.model}
                                onChange={(e) =>
                                    setData('model', e.target.value)
                                }
                                placeholder="e.g. Climber 2.0"
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />

                            {errors.model && (
                                <p className="text-sm text-destructive">
                                    {errors.model}
                                </p>
                            )}
                        </div>

                        {/* Type */}
                        <div className="space-y-2">
                            <label
                                htmlFor="type"
                                className="text-sm font-medium"
                            >
                                Bike Type
                            </label>

                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) =>
                                    setData('type', e.target.value)
                                }
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="hybrid">Hybrid</option>
                                <option value="road">Road</option>
                                <option value="mountain">Mountain</option>
                                <option value="gravel">Gravel</option>
                                <option value="city">City</option>
                            </select>

                            {errors.type && (
                                <p className="text-sm text-destructive">
                                    {errors.type}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Rental information */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-medium">
                            Rental Information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Configure the bike's rental settings and status.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Frame size */}
                        <div className="space-y-2">
                            <label
                                htmlFor="frame_size"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <Ruler className="h-4 w-4 text-muted-foreground" />
                                Frame Size
                            </label>

                            <div className="relative">
                                <input
                                    id="frame_size"
                                    type="number"
                                    min="1"
                                    value={data.frame_size}
                                    onChange={(e) =>
                                        setData(
                                            'frame_size',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border bg-background px-3 py-2 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    cm
                                </span>
                            </div>

                            {errors.frame_size && (
                                <p className="text-sm text-destructive">
                                    {errors.frame_size}
                                </p>
                            )}
                        </div>

                        {/* Hourly rate */}
                        <div className="space-y-2">
                            <label
                                htmlFor="hourly_rate"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                Hourly Rate
                            </label>

                            <div className="relative">
                                <input
                                    id="hourly_rate"
                                    type="number"
                                    min="0"
                                    value={data.hourly_rate}
                                    onChange={(e) =>
                                        setData(
                                            'hourly_rate',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border bg-background px-3 py-2 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    EGP
                                </span>
                            </div>

                            {errors.hourly_rate && (
                                <p className="text-sm text-destructive">
                                    {errors.hourly_rate}
                                </p>
                            )}
                        </div>

                        {/* Purchase date */}
                        <div className="space-y-2">
                            <label
                                htmlFor="purchase_date"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                Purchase Date
                            </label>

                            <input
                                id="purchase_date"
                                type="date"
                                value={data.purchase_date}
                                onChange={(e) =>
                                    setData(
                                        'purchase_date',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />

                            {errors.purchase_date && (
                                <p className="text-sm text-destructive">
                                    {errors.purchase_date}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="available">Available</option>
                                <option value="rented">Rented</option>
                                <option value="maintenance">
                                    Maintenance
                                </option>
                            </select>

                            {errors.status && (
                                <p className="text-sm text-destructive">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        disabled={processing}
                        className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {processing ? 'Creating...' : 'Create Bike'}
                    </button>
                </div>
            </form>
        </div>
    );
}