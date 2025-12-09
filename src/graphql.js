// src/graphql.js
// src/graphql.js

// Use the environment variable
//const GRAPHQL_URL = import.meta.env?.VITE_GRAPHQL_URL || process.env.REACT_APP_GRAPHQL_URL || "https://cms.visitruboni.com/graphql";

//const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL; for react  create next app project

// src/graphql.js
// src/graphql.js
const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL;

/**
 * Generic GraphQL fetch
 */
export const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      
    });

    const data = await response.json();
    console.log("GraphQL raw response:", data);

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return null;
    }
    return data.data;
    
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};


/**
 * Fetch all lodges/accommodations
 */
export const getLodges = async () => {
  const query = `
    query {
      lodges {
        data {
          id
          attributes {
            name
            location
            services
            region
            district
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  `;
  return fetchGraphQL(query);
};

/**
 * Fetch single lodge by ID
 */
export const getLodgeById = async (id) => {
  const query = `
    query ($id: ID!) {
      lodge(id: $id) {
        data {
          id
          attributes {
             name
            location
            services
            region
            district
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  `;
  return fetchGraphQL(query, { id });
};