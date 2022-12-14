import React, { useEffect, useState } from "react"
import axios from "axios"
import Carousel from "react-bootstrap/Carousel"
import { ButtonGroup } from "react-bootstrap"
import Loaders from "../utilities/loaders"

const Collection = () => {
    const [datas, setDatas] = useState([])
    const [limit, setLimit] = useState(3)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        let isCancelled = false
        if(isCancelled === false)
        axios({
         method: "GET",
         url: `${process.env.REACT_APP_BASEURL}/photos?_limit=${limit}`
        }).then((result) => setDatas(result.data)).catch((err) => console.log(err)).finally(() =>
        setloading(false))
    
      return () => { isCancelled = true }
    }, [limit])

    const handleLimit = (Option) => {
        Option === "+" ? setLimit((prev) => prev + 1) : setLimit((prev) => prev -1)
    }

    if (loading) return <Loaders/>

    return (
        <React.Fragment>
                <h3>{limit} collection</h3>
             <Carousel>
                {datas.map((data, i) => {
                    console.table(data)
                    return (
                        <Carousel.Item key={i}>
                        <img
                          className="d-block w-100"
                          src={data.url}
                          alt="First slide"
                          height={450}
                          width={450}

                        />
                        <Carousel.Caption>
                          <h3>{data.title}</h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    )
})}

    </Carousel> 
    <ButtonGroup className="d-flex justify-content-center align-item-center mt-2">
    <button ClassName="btn btn-outline-primary" onClick={() => handleLimit("+")}>+</button>
    {limit > 1 &&
    <button ClassName="btn btn-outline-primary" onClick={() => handleLimit("-")}>-</button>
    }
    </ButtonGroup>
 </React.Fragment> 
    )
} 

export default Collection