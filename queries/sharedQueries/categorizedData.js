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
