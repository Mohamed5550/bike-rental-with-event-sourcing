import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
        brand: "",
        model: "",
        type: "",
        frame_size: 0,
        hourly_rate: 0,
        purchase_date: "",
        status: "available",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post("/bikes");
    }

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
                Register Bike
            </h1>

            <form onSubmit={submit} className="space-y-4">
                <input
                    className="border p-2 w-full"
                    placeholder="Code"
                    value={data.code}
                    onChange={(e) =>
                        setData("code", e.target.value)
                    }
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Brand"
                    value={data.brand}
                    onChange={(e) =>
                        setData("brand", e.target.value)
                    }
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Model"
                    value={data.model}
                    onChange={(e) =>
                        setData("model", e.target.value)
                    }
                />

                <button
                    disabled={processing}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </form>
        </div>
    );
}