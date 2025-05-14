import React, { useEffect, useState } from 'react'
import { FiltersOption } from '../molecules/FiltersOption'
import { DashboardPrincipal } from './DashboardPrincipal'
import { usePublications } from '../../hooks/usePublications'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4003')

export const DashboardFilters = () => {
    const {publications, fetchPublications} = usePublications()
    const [activeFilter, setActiveFilter] = useState({})

    useEffect(() => {
        socket.on('newPublication', () => {
          fetchPublications(activeFilter); // vuelve a aplicar el filtro actual
        });
    
        return () => {
            socket.off('newPublication');
        }
    }, [activeFilter, fetchPublications]);
    
    const handleFilter = async (filters) => {
        setActiveFilter(filters); // guarda el filtro actual
        await fetchPublications(filters);
    }
    return (
        <div>
            <FiltersOption onFilter={handleFilter}/>
            <DashboardPrincipal publications={publications}/>
        </div>
    )
}
