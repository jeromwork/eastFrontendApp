export const useIsEqual = (a:any, b:any) => {
if (a === b) return true;
if (a && b ) return (a && b && JSON.stringify(a) === JSON.stringify(b));
    else return a !== a && b !== b;
}