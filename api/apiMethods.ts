export const ApiMethods={
    POST:"post",
    GET:'get',
    PUT:'put',
    DELETE:'delete'
}as const;

// Now TypeScript infers:

// type ApiMethods = {
//   readonly POST: "post";
//   readonly GET: "get";
//   readonly PUT: "put";
//   readonly DELETE: "delete";
// };