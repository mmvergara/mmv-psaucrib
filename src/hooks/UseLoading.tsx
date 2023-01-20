import {useState } from 'react'
import LoadingCrown from './utilities/LoadingCrown'

const useLoading = (text:string)=> {
  const [isLoading,setIsLoading] = useState(false)
  const startLoading = () =>{
    setIsLoading(true);
  }
  const endLoading = ()=>{
    setIsLoading(false)
  }
  const LoadingCircle = isLoading ? <LoadingCrown/> : text;
  return { LoadingCircle, startLoading, endLoading }
}

export default useLoading;