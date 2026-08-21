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

type Props = {
    bike: Bike;
};

export default function Show({ bike }: Props) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">
                {bike.code}
            </h1>

            <ul className="space-y-2">
                <li>Brand: {bike.brand}</li>
                <li>Model: {bike.model}</li>
                <li>Type: {bike.type}</li>
                <li>Frame Size: {bike.frame_size}</li>
                <li>Hourly Rate: {bike.hourly_rate}</li>
                <li>Status: {bike.status}</li>
            </ul>
        </div>
    );
}