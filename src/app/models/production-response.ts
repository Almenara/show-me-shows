import { Production } from "./production";

export interface ProductionResponse {
    page: number;
    results: Production[];
    total_pages: number;
    total_results: number;
}