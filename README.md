# Frontend Developer Test

This test evaluates frontend development skills based on an existing e-commerce project.

**Task:**  
Implement a responsive Product Card component for a product listing page using the provided test data.

**Requirements:**  
- Display product image, name, and price  
- Variant options as a dropdown or label  
- “Add to Cart” button, or replaced with “Out of Stock” if unavailable  
- Clean, modern UI following UI/UX best practices  
- Responsive design for various screen sizes

**Deliverables:**  
- Link to a working demo
- Brief note explaining layout approach and responsiveness considerations

---

Install dependencies

```bash
  npm install

  or 

  npm install react-material-ui-carousel --save --legacy-peer-deps
```

Start the frontend

```bash
  npm start
```

The server should now be running. You can access the application by opening a web browser and entering the following URL:

```bash
  http://localhost:3000
```

---


## Layout Approach and Responsiveness

### Layout Approach

The Product Card component is built using CSS Grid to create a flexible and clean layout that adapts well to various screen sizes. Each product card displays the product image, name, price, variant options (color and size), and an "Add to Cart" button in a clear and accessible way. Note that some of these fields are added dynamically since they are not available in the real API.

For displaying multiple product images, the `react-material-ui-carousel` package is used, allowing interactive photo browsing. Because it’s difficult to override styles for these built-in components, I chose not to adapt the Product Card specifically for screens smaller than 320px. This is not critical nowadays as devices with such small screens are practically nonexistent. On hover, the carousel slides automatically, enhancing user interaction. Additionally, both the product image and title serve as links for intuitive navigation to the product detail page.

The card design is simple and user-friendly, following modern UI/UX best practices like sufficient spacing, clear typography, and intuitive variant selection.

### Responsiveness Considerations

In this project, no custom media queries were applied because the focus is on a single product card where complex responsiveness isn’t necessary. However, I generally follow a mobile-first approach.

For very small screens (up to 320px), it’s better to use stretched images to maximize readability, while for larger screens fixed heights (such as 300px for the image container in my styles) provide a balanced visual hierarchy.

Overall, the component ensures usability and an appealing look across most modern devices.
