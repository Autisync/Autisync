import DeliveriesCrm from "./DeliveriesCrm";
import { deliveriesMetadata, deliveriesSchema } from "./meta";

export const metadata = deliveriesMetadata("en");

export default function Page() {
    return (
        <div lang="en">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveriesSchema("en")) }} />
            <DeliveriesCrm locale="en" />
        </div>
    );
}
