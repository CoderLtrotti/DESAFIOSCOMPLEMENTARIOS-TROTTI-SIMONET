export function generateMockProducts(count) {
    const mockProducts = [];
  
    for (let i = 1; i <= count; i++) {
      const product = {
        _id: `product${i}`,
        name: `Product ${i}`,
        description: `This is the description for Product ${i}`,
        price: Math.random() * 100, // Precio aleatorio entre 0 y 100
      };
      mockProducts.push(product);
    }
  
    return mockProducts;
  }
  
  export function getMockProducts(req, res) {
    // Genera 100 productos de ejemplo con un formato similar al de una respuesta de MongoDB
    const mockProducts = generateMockProducts(100);
    res.json(mockProducts);
  }