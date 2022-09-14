const apiKey = '7XO3wpS0y_k0hZwjosDddypgOk7wGApu9qgYeMIELYM_rXP-b4M3Vkriy7y5wtzvYMJ_faFlpvahmeQHGEGikl2NHgwMasbhLk9Oe0XBDPHcSSI3_AYdEb-NycfQXnYx';


function searchYelp(term, location, priceString, sortBy) {
  const corsProxy = "https://private-cors-server.herokuapp.com/";
  const yelpApi = "https://api.yelp.com/v3/businesses/search";
  const searchParams = `?term=${term}&location=${location}&price=${priceString}&sort_by=${sortBy}`;
  const fetchOptions = { headers: { Authorization: `Bearer ${apiKey}`}};
  return fetch(corsProxy + yelpApi + searchParams, fetchOptions)
  .then(response => response.json())
  .then(jsonResponse => {
    console.log(jsonResponse);
    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map(business => ({
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        category: business.categories[0].title,
        rating: business.rating,
        reviewCount: business.review_count,
        url: business.url
      }));
    }
  });
}

export default searchYelp;
