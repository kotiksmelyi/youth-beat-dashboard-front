import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { Map } from '../Map/Map'
import styles from './Body.module.css'

export const Body: FC = () => {

  const [array, setArray] = useState([])
  const [filters, setFilters] = useState([])

  const fetchRegions = async () => {
        const response = await axios
        .get('http://78.140.241.174:8100/geography/regions')
        .then ((res) => { 
          const newArray = optionsToValues(res.data); setArray(res.data)})
    }

    const fetchFilters = async () => {
        const response = await axios
        .get('http://78.140.241.174:8100/stats/features')
        .then ((res) => { 
          const newArray = optionsToValues(res.data); setFilters(res.data)})
    }

    function optionsToValues (options: any) {
        for (var i = 0; i < options?.length; i++) {
            options[i].label = options[i].name;
            options[i].value = options[i].id
            delete options[i].name;
            }
    }



  useEffect(() => {
    fetchRegions()
    fetchFilters()

    }, [])
    
    return (
        <div className={styles.container}>
          <h1 className={styles.header}>Аналитика</h1>
          <Map options={array} filters={filters} children={<div>rr</div>} />
          
        </div>
    )
}