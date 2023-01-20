
const useDate = (getTime:number)=>{
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(new Date(getTime));
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(getTime));
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(new Date(getTime));

  return `${da} ${mo} ${ye}`
}

export default useDate