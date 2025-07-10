import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Book, 
 // CreditCard, 
//  Truck, 
//  Shield, 
//  User, 
//  MessageCircle, 
  ChevronRight,
  ChevronDown,
//  ArrowLeft,
//  ExternalLink,
//  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AnimatedP } from '../animation/animate';
import HelpHeader from '../components/help-center/helpHeader';
import HelpHero from '../components/help-center/helpHero';
import SearchResults from '../components/help-center/searchResult';
import HelpCategories from '../components/help-center/helpCategories';
import PopularArticles from '../components/help-center/popularArticles';
import QuickLinks from '../components/help-center/quickLinks';
import SidebarContact from '../components/help-center/sidebarContacts';
import SidebarSystemStatus from '../components/help-center/sidebarSystemStatus';
import SidebarRecentUpdates from '../components/help-center/sidebarRecentUpdates';
import { helpCategoriesData, quickLinksData } from '../components/common/helpData';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get popular articles across all categories
  const getPopularArticles = () => {
    const popular = [];
    helpCategoriesData.forEach(category => {
      category.articles.forEach(article => {
        if (article.popular) {
          popular.push({
            ...article,
            category: category.title,
            categoryId: category.id
          });
        }
      });
    });
    return popular.slice(0, 6); // Show top 6 popular articles
  };

  const popularArticles = getPopularArticles();

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = [];
      const query = searchQuery.toLowerCase();

      helpCategoriesData.forEach(category => {
        // Search in category title
        if (category.title.toLowerCase().includes(query)) {
          results.push({
            type: 'category',
            id: category.id,
            title: category.title,
            description: category.description,
            icon: category.icon,
            color: category.color
          });
        }

        // Search in articles
        category.articles.forEach(article => {
          if (article.title.toLowerCase().includes(query)) {
            results.push({
              type: 'article',
              title: article.title,
              url: article.url,
              category: category.title,
              categoryId: category.id,
              popular: article.popular
            });
          }
        });
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleBackToHome = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HelpHeader onBackClick={handleBackToHome} />

      <HelpHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        AnimatedP={AnimatedP} 
        SearchIcon={Search} 
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {searchQuery && (
          <SearchResults 
            searchResults={searchResults} 
            isSearching={isSearching} 
            toggleSection={toggleSection}
            BookIcon={Book}
            AlertCircleIcon={AlertCircle}
            ChevronRightIcon={ChevronRight}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!searchQuery && (
              <HelpCategories 
                helpCategories={helpCategoriesData} 
                expandedSection={expandedSection} 
                toggleSection={toggleSection} 
                AnimatedP={AnimatedP}
                ChevronRightIcon={ChevronRight}
                ChevronDownIcon={ChevronDown}
              />
            )}

            {!searchQuery && (
              <PopularArticles 
                popularArticles={popularArticles} 
                AnimatedP={AnimatedP}
                ChevronRightIcon={ChevronRight}
              />
            )}
          </div>

          <div className="space-y-6">
            <QuickLinks quickLinks={quickLinksData} />
            <SidebarContact />
            <SidebarSystemStatus CheckCircleIcon={CheckCircle} />
            <SidebarRecentUpdates />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;