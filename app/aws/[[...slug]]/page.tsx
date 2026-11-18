import { docsRoute } from "@/components/docs-route";

const route = docsRoute("aws");
export default route.Page;
export const generateMetadata = route.generateMetadata;
export const generateStaticParams = route.generateStaticParams;
