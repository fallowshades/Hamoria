export const getCategoryQuery = (subsections) => ({
  $match: { subsection: { $in: subsections } },
})

export const getGroupByQuery = () => ({
  $group: { _id: '$subsection', items: { $push: '$$ROOT' } },
})

export const getSortByQuery = () => ({
  $sort: {
    _id: 1, // Sorting in ascending order based on the _id field (group ID)
  },
})

export const customOrder = (categorizedData, queryObject) => {
  const subsectionOrder = {}
  queryObject.subsection.forEach((subsection, index) => {
    subsectionOrder[subsection] = index
  })

  // Custom sorting logic
  categorizedData.sort((a, b) => {
    const orderA = subsectionOrder[a._id]
    const orderB = subsectionOrder[b._id]

    if (orderA < orderB) return -1
    if (orderA > orderB) return 1
    return 0
  })
  return categorizedData
}
