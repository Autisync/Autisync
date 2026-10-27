import DeliveriesCrm from "../deliveries/DeliveriesCrm";
import { deliveriesMetadata, deliveriesSchema } from "../deliveries/meta";

export const metadata = deliveriesMetadata("pt");

export default function Page() {
    return (
        <div lang="pt-PT">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveriesSchema("pt")) }} />
            <DeliveriesCrm locale="pt" />
        </div>
    );
}
