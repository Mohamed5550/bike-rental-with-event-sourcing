import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    Bike as BikeIcon,
    CalendarClock,
    Clock,
    Loader2,
} from 'lucide-react';

import { store as rentalsStore } from '@/routes/rentals';

type Bike = {
    uuid: string;
    code: string;
    brand: string;
    model: string;
    hourly_rate: number;
};

type Props = {
    bikes: Bike[];
};

export default function Create({ bikes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        bike_uuid: '',
        duration_in_hours: 1,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(rentalsStore().url);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarClock className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Start Rental
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Start a new bike rental.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Rental information */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-medium">
                            Rental Information
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Select a bike and specify how long it will be
                            rented.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Bike */}
                        <div className="space-y-2">
                            <label
                                htmlFor="bike_uuid"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <BikeIcon className="h-4 w-4 text-muted-foreground" />
                                Bike
                            </label>

                            <select
                                id="bike_uuid"
                                value={data.bike_uuid}
                                onChange={(e) =>
                                    setData('bike_uuid', e.target.value)
                                }
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="">
                                    Select a bike
                                </option>

                                {bikes.map((bike) => (
                                    <option
                                        key={bike.uuid}
                                        value={bike.uuid}
                                    >
                                        {bike.code} — {bike.brand}{' '}
                                        {bike.model} ({bike.hourly_rate} EGP/hr)
                                    </option>
                                ))}
                            </select>

                            {errors.bike_uuid && (
                                <p className="text-sm text-destructive">
                                    {errors.bike_uuid}
                                </p>
                            )}
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                            <label
                                htmlFor="duration_in_hours"
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                Rental Duration
                            </label>

                            <div className="relative">
                                <input
                                    id="duration_in_hours"
                                    type="number"
                                    min="1"
                                    max="24"
                                    value={data.duration_in_hours}
                                    onChange={(e) =>
                                        setData(
                                            'duration_in_hours',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border bg-background px-3 py-2 pr-16 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />

                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    hours
                                </span>
                            </div>

                            {errors.duration_in_hours && (
                                <p className="text-sm text-destructive">
                                    {errors.duration_in_hours}
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

                        {processing ? 'Starting...' : 'Start Rental'}
                    </button>
                </div>
            </form>
        </div>
    );
}