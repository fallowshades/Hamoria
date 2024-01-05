export const getCategoryQuery = (subsections) => ({
  $match: { subsection: { $in: subsections } },
})

export const getGroupByQuery = () => ({
  $group: { _id: '$subsection', items: { $push: '$$ROOT' } },
})
