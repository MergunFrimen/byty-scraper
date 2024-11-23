export const ADVERT_LIST_QUERY = `
query AdvertList(
  $locale: Locale!,
  $estateType: [EstateType],
  $offerType: [OfferType],
  $disposition: [Disposition],
  $landType: [LandType],
  $region: ID,
  $regionOsmIds: [ID],
  $limit: Int = 15,
  $offset: Int = 0,
  $order: ResultOrder = TIMEORDER_DESC,
  $petFriendly: Boolean,
  $balconyFrom: Float,
  $balconyTo: Float,
  $loggiaFrom: Float,
  $loggiaTo: Float,
  $terraceFrom: Float,
  $terraceTo: Float,
  $cellarFrom: Float,
  $cellarTo: Float,
  $frontGardenFrom: Float,
  $frontGardenTo: Float,
  $parking: Boolean,
  $garage: Boolean,
  $lift: Boolean,
  $ownership: [Ownership],
  $condition: [Condition],
  $construction: [Construction],
  $equipped: [Equipped],
  $priceFrom: Int,
  $priceTo: Int,
  $surfaceFrom: Int,
  $surfaceTo: Int,
  $surfaceLandFrom: Int,
  $surfaceLandTo: Int,
  $advertId: [ID],
  $roommate: Boolean,
  $includeImports: Boolean,
  $boundaryPoints: [GPSPointInput],
  $discountedOnly: Boolean,
  $discountedOnlyByEstimate: Boolean,
  $barrierFree: Boolean,
  $polygonBuffer: Int,
  $availableFrom: DateTime,
  $importType: AdvertImportType,
  $currency: Currency,
  $searchPriceWithCharges: Boolean,
  $lowEnergy: Boolean
) {
  listAdverts(
    offerType: $offerType
    estateType: $estateType
    disposition: $disposition
    landType: $landType
    limit: $limit
    regionId: $region
    regionOsmIds: $regionOsmIds
    offset: $offset
    order: $order
    petFriendly: $petFriendly
    balconySurfaceFrom: $balconyFrom
    balconySurfaceTo: $balconyTo
    loggiaSurfaceFrom: $loggiaFrom
    loggiaSurfaceTo: $loggiaTo
    terraceSurfaceFrom: $terraceFrom
    terraceSurfaceTo: $terraceTo
    cellarSurfaceFrom: $cellarFrom
    cellarSurfaceTo: $cellarTo
    frontGardenSurfaceFrom: $frontGardenFrom
    frontGardenSurfaceTo: $frontGardenTo
    parking: $parking
    garage: $garage
    lift: $lift
    ownership: $ownership
    condition: $condition
    construction: $construction
    equipped: $equipped
    priceFrom: $priceFrom
    priceTo: $priceTo
    surfaceFrom: $surfaceFrom
    surfaceTo: $surfaceTo
    surfaceLandFrom: $surfaceLandFrom
    surfaceLandTo: $surfaceLandTo
    ids: $advertId
    roommate: $roommate
    includeImports: $includeImports
    boundaryPoints: $boundaryPoints
    discountedOnly: $discountedOnly
    discountedOnlyByEstimate: $discountedOnlyByEstimate
    polygonBuffer: $polygonBuffer
    barrierFree: $barrierFree
    availableFrom: $availableFrom
    importType: $importType
    currency: $currency
    searchPriceWithCharges: $searchPriceWithCharges
    lowEnergy: $lowEnergy
  ) {
    list {
      id
      uri
      estateType
      offerType
      disposition
      landType
      imageAltText(locale: $locale)
      mainImage {
        id
        url(filter: RECORD_THUMB)
        __typename
      }
      publicImages(limit: 3) {
        id
        size(filter: RECORD_MAIN) {
          height
          width
          __typename
        }
        url(filter: RECORD_MAIN)
        type
        originalImage {
          id
          __typename
        }
        __typename
      }
      address(locale: $locale)
      surface
      surfaceLand
      tags(locale: $locale)
      price
      charges
      currency
      petFriendly
      reserved
      highlighted
      roommate
      project {
        id
        __typename
      }
      gps {
        lat
        lng
        __typename
      }
      mortgageData(locale: $locale) {
        rateLow
        rateHigh
        loan
        years
        __typename
      }
      originalPrice
      isDiscounted
      nemoreport {
        id
        status
        timeCreated
        __typename
      }
      isNew
      videos {
        id
        previewUrl
        status
        __typename
      }
      links {
        id
        url
        type
        status
        __typename
      }
      type
      dataJson
      minRentDays
      maxRentDays
      __typename
    }
    totalCount
    __typename
  }
  actionList: listAdverts(
    offerType: $offerType
    estateType: $estateType
    disposition: $disposition
    landType: $landType
    regionId: $region
    regionOsmIds: $regionOsmIds
    order: $order
    petFriendly: $petFriendly
    balconySurfaceFrom: $balconyFrom
    balconySurfaceTo: $balconyTo
    loggiaSurfaceFrom: $loggiaFrom
    loggiaSurfaceTo: $loggiaTo
    terraceSurfaceFrom: $terraceFrom
    terraceSurfaceTo: $terraceTo
    cellarSurfaceFrom: $cellarFrom
    cellarSurfaceTo: $cellarTo
    parking: $parking
    garage: $garage
    lift: $lift
    ownership: $ownership
    condition: $condition
    construction: $construction
    equipped: $equipped
    priceFrom: $priceFrom
    priceTo: $priceTo
    surfaceFrom: $surfaceFrom
    surfaceTo: $surfaceTo
    surfaceLandFrom: $surfaceLandFrom
    surfaceLandTo: $surfaceLandTo
    ids: $advertId
    roommate: $roommate
    includeImports: $includeImports
    boundaryPoints: $boundaryPoints
    discountedOnly: true
    limit: 3
    availableFrom: $availableFrom
    searchPriceWithCharges: $searchPriceWithCharges
    lowEnergy: $lowEnergy
  ) {
    totalCount
    __typename
  }
}
`;
