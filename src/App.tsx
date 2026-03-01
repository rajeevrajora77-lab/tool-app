import { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import toolsData from './data/tools_database.json';
import categoriesData from './data/categories.json';
import type { Tool, CategoryMap } from './types/tools';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              🚀 AI & Digital Tools Intelligence
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Discover {tools.length}+ cutting-edge tools across {uniqueCategories.length} categories
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-sm opacity-90 font-medium">Total Tools</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold">{stats.filtered}</div>
              <div className="text-sm opacity-90 font-medium">Showing</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold">{stats.categories}</div>
              <div className="text-sm opacity-90 font-medium">Categories</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold">{stats.opensource}</div>
              <div className="text-sm opacity-90 font-medium">Open Source</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl font-bold">{stats.free}</div>
              <div className="text-sm opacity-90 font-medium">Free Tier</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="🔍 Search by name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            >
              <option value="all">📦 All Segments</option>
              <option value={1}>💻 Development & Data</option>
              <option value={2}>🎯 Business & Tools</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            >
              <option value="all">🗂️ All Categories</option>
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
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
            >
              <option value="all">🏷️ All Types</option>
              <option value="Open-source">🔓 Open Source</option>
              <option value="Proprietary">🔒 Proprietary</option>
              <option value="Open Core">⚡ Open Core</option>
            </select>

            <label className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors font-medium">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">💚 Free Tier Only</span>
            </label>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{tool.category}</p>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 ml-3 p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                  title="Visit website"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                  tool.type === 'Open-source' ? 'bg-green-100 text-green-700 border border-green-300' :
                  tool.type === 'Proprietary' ? 'bg-gray-100 text-gray-700 border border-gray-300' :
                  'bg-blue-100 text-blue-700 border border-blue-300'
                }`}>
                  {tool.type === 'Open-source' ? '🔓 ' : tool.type === 'Proprietary' ? '🔒 ' : '⚡ '}
                  {tool.type}
                </span>
                {tool.pricing.free && (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold">
                    💚 Free Tier
                  </span>
                )}
                {tool.apiAvailable && (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300 font-semibold">
                    🔌 API
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {tool.description}
              </p>

              {/* Pricing */}
              <div className="mb-4 bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-1.5 text-green-600" />
                  Pricing Plans
                </div>
                <div className="space-y-2">
                  {tool.pricing.tiers.slice(0, 2).map((tier, idx) => (
                    <div key={idx} className="text-sm text-gray-700 flex justify-between items-center">
                      <span className="font-semibold">{tier.name}</span>
                      <span className="text-blue-600 font-bold">
                        {tier.price === 0 ? '✨ Free' : `$${tier.price}${tier.period ? '/' + tier.period : ''}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="font-bold text-green-700 mb-2 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Pros
                  </div>
                  <ul className="space-y-1.5">
                    {tool.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="text-gray-700 leading-tight">
                        • {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="font-bold text-red-700 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Cons
                  </div>
                  <ul className="space-y-1.5">
                    {tool.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="text-gray-700 leading-tight">
                        • {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <Filter className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No tools found</h3>
            <p className="text-gray-600 text-lg mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSegment('all');
                setSelectedType('all');
                setShowFreeOnly(false);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-600 font-medium text-lg">
            🚀 AI & Digital Tools Intelligence System 2026
          </p>
          <p className="text-gray-500 mt-2">
            {tools.length} Tools • {uniqueCategories.length} Categories • Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
