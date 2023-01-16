export default function range (start : number, end : number, increment ?: number) : Array<number>
{
    return (new Array(end).fill(1).map((value : number, index : number) => (index * (increment || value))).slice(start))
}