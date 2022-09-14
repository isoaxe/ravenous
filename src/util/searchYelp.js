// TODO: Replace the Yelp API key below with one obtained for your own account if hosting remote.
const apiKey = '7XO3wpS0y_k0hZwjosDddypgOk7wGApu9qgYeMIELYM_rXP-b4M3Vkriy7y5wtzvYMJ_faFlpvahmeQHGEGikl2NHgwMasbhLk9Oe0XBDPHcSSI3_AYdEb-NycfQXnYx';

async function searchYelp(term, location, priceString, sortBy) {
  const corsProxy = "https://private-cors-server.herokuapp.com/";
  const yelpApi = "https://api.yelp.com/v3/businesses/search";
  const searchParams = `?term=${term}&location=${location}&price=${priceString}&sort_by=${sortBy}`;
  const fetchOptions = { headers: { Authorization: `Bearer ${apiKey}`}};

  const response = await fetch(corsProxy + yelpApi + searchParams, fetchOptions);
  const jsonResponse = await response.json();
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
  } else {
    return jsonResponse;
  }
}

export default searchYelp;
