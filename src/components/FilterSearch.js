import React from 'react'

const FilterSearch = ({ filteredName, handleFilteredName }) => (
    <div>
        filter shown with <input value={filteredName} onChange={handleFilteredName} />
    </div>
)

export default FilterSearch