import { quote } from "./quote.model"

export interface company{
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string,
    data: quote
}