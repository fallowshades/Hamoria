import Word from '../../models/wordModel.js'
import Example from '../../models/exampleModel.js'

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

export const getCategorizedData = async (model, queryObject) => {
  let categorizedData = await model.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
    getSortByQuery(),
  ])

  return customOrder(categorizedData, queryObject)
}
