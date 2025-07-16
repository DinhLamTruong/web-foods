import React from 'react';

const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortOptions,
  selectedSort,
  onSelectSort,
  priceRanges,
  selectedPriceRange,
  onSelectPriceRange,
}) => {
  return (
    // w-30 md:w-40 lg:w-80
    <div className="bg-white rounded-lg p-4 shadow-md space-y-6  hidden  md:block lg:block">
      <div>
        <h3 className="font-semibold text-lg mb-3">Danh mục sản phẩm</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li
              key={category.id}
              className={`cursor-pointer ${
                selectedCategory === category.id
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-700 hover:text-orange-500'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Sắp xếp</h3>
        <ul className="space-y-2">
          {sortOptions.map(option => (
            <li
              key={option.id}
              className="flex items-center cursor-pointer"
              onClick={() => onSelectSort(option.id)}
            >
              <input
                type="radio"
                name="sort"
                checked={selectedSort === option.id}
                onChange={() => onSelectSort(option.id)}
                className="mr-2"
              />
              <label>{option.label}</label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Chọn mức giá</h3>
        <ul className="space-y-2">
          {priceRanges.map(range => (
            <li
              key={range.id}
              className="flex items-center cursor-pointer"
              onClick={() => onSelectPriceRange(range.id)}
            >
              <input
                type="checkbox"
                checked={selectedPriceRange.includes(range.id)}
                onChange={() => onSelectPriceRange(range.id)}
                className="mr-2"
              />
              <label>{range.label}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
