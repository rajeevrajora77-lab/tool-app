import { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, DollarSign } from 'lucide-react';
import toolsData from './data/tools_database.json';
import categoriesData from './data/categories.json';
import { Tool, CategoryMap } from './types/tools';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const tools = toolsData as Tool[];
  const categories = categoriesData as CategoryMap;

  const uniqueCategories = useMemo(() => {
    const cats = new Set(tools.map(t => t.categoryId));
    return Array.from(cats).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.categoryId === selectedCategory;
      const matchesSegment = selectedSegment === 'all' || tool.segment === selectedSegment;
      const matchesType = selectedType === 'all' || tool.type === selectedType;
      const matchesFree = !showFreeOnly || tool.pricing.free;
      
      return matchesSearch && matchesCategory && matchesSegment && matchesType && matchesFree;
    });
  }, [tools, searchQuery, selectedCategory, selectedSegment, selectedType, showFreeOnly]);

  const stats = useMemo(() => {
    return {
      total: tools.length,
      filtered: filteredTools.length,
      opensource: tools.filter(t => t.type === 'Open-source').length,
      free: tools.filter(t => t.pricing.free).length,
      categories: uniqueCategories.length
    };
  }, [tools, filteredTools, uniqueCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI & Digital Tools Intelligence System
          </h1>
          <p className="text-gray-600">
            Comprehensive database of 500+ tools across 37 categories
          </p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Tools</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{stats.filtered}</div>
              <div className="text-sm text-gray-600">Filtered</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{stats.categories}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">{stats.opensource}</div>
              <div className="text-sm text-gray-600">Open Source</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">{stats.free}</div>
              <div className="text-sm text-gray-600">Free Tier</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Segments</option>
              <option value={1}>Segment 1: Development & Data</option>
              <option value={2}>Segment 2: Business & Tools</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(catId => {
                const category = Object.values(categories).find(c => c.id === catId);
                return (
                  <option key={catId} value={catId}>
                    {category?.name || catId}
                  </option>
                );
              })}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Open-source">Open Source</option>
              <option value="Proprietary">Proprietary</option>
              <option value="Open Core">Open Core</option>
            </select>

            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Free Tier Only</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tool.category}</p>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tool.type === 'Open-source' ? 'bg-green-100 text-green-700' :
                  tool.type === 'Proprietary' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {tool.type}
                </span>
                {tool.pricing.free && (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Free Tier
                  </span>
                )}
                {tool.apiAvailable && (
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    API Available
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {tool.description}
              </p>

              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Pricing
                </div>
                <div className="space-y-1">
                  {tool.pricing.tiers.slice(0, 2).map((tier, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      <span className="font-medium">{tier.name}:</span>{' '}
                      {tier.price === 0 ? 'Free' : `$${tier.price}${tier.period ? '/' + tier.period : ''}`}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-semibold text-green-600 mb-1">Pros</div>
                  <ul className="space-y-1">
                    {tool.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="text-gray-600">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-red-600 mb-1">Cons</div>
                  <ul className="space-y-1">
                    {tool.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="text-gray-600">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>AI & Digital Tools Intelligence System 2025 • {tools.length} Tools • 37 Categories</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
