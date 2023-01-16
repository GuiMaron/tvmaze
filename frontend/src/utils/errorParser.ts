export function isError404 (message : string) : boolean
{
    return (/^(ERR_BAD_REQUEST){1}.*404$/gmi.test(message))
}
