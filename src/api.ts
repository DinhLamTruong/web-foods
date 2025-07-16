export const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchAllProducts() {
  const response = await fetch(\`\${API_BASE_URL}/product\`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
}

export async function fetchBestSellingProducts() {
  const products = await fetchAllProducts();
  return products.filter(product => product.bestSelling === true || product.bestSelling === 1);
}

export async function fetchSuggestedProducts() {
  const products = await fetchAllProducts();
  return products.filter(product => product.suggestion === true);
}
