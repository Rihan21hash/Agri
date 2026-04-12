import { useCallback, useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getItems, markAsSold } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { sortItemsByUrgency } from "../utils/sortItems";
import { PackageSearch, AlertCircle, Loader2, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

function MyItemsPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = getItems(
      db,
      (rows) => {
        setError(null);
        setItems(rows);
        setLoading(false);
      },
      (err) => {
        setError(formatFirebaseError(err));
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  const mine = useMemo(() => {
    if (!currentUser?.uid) return [];
    return items.filter((i) => i.sellerId === currentUser.uid);
  }, [items, currentUser?.uid]);

  const sorted = useMemo(() => sortItemsByUrgency(mine), [mine]);

  const available = sorted.filter((i) => i.status === "available");
  const sold = sorted.filter((i) => i.status === "sold");

  const handleMarkSold = useCallback(
    async (id) => {
      if (!currentUser) return;
      setActionError(null);
      try {
        await markAsSold(db, id);
      } catch (e) {
        setActionError(formatFirebaseError(e));
      }
    },
    [currentUser]
  );

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="bg-soil-dark-900 rounded-3xl p-8 sm:p-10 shadow-card text-white relative overflow-hidden isolate">
         <div className="absolute top-0 right-0 -mr-8 -mt-8 text-soil-dark-800 opacity-50 z-0">
            <PackageSearch className="w-48 h-48" />
         </div>
         <div className="relative z-10">
           <p className="text-sm font-bold uppercase tracking-widest text-soil-dark-400 mb-2">Inventory Management</p>
           <h2 className="font-display text-3xl font-bold sm:text-4xl text-white">
             My Harvest Listings
           </h2>
           <p className="mt-4 text-base leading-relaxed text-soil-dark-300 max-w-2xl">
             Track your active listings and past sales. Keep your inventory up to date so buyers know exactly what you have available right now.
           </p>
         </div>
      </div>

      {error ? (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 shadow-sm" role="alert">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}
      
      {actionError ? (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 shadow-sm" role="alert">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{actionError}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-agri-green-600">
           <Loader2 className="h-10 w-10 animate-spin mb-4" />
           <p className="text-sm font-bold tracking-widest uppercase">Loading Inventory...</p>
        </div>
      ) : (
        <div className="space-y-12">
           {/* Available Section */}
           <section className="space-y-6">
             <div className="flex items-center gap-3 border-b border-soil-dark-200 pb-4">
                <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-agri-green-100 text-agri-green-700">
                   <PackageSearch className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-bold text-soil-dark-950 font-display">
                  Available Now <span className="ml-2 bg-agri-green-100 text-agri-green-800 text-sm px-3 py-1 rounded-full">{available.length}</span>
                </h3>
             </div>
             
             {available.length === 0 ? (
               <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soil-dark-200 bg-white/50 px-6 py-16 text-center">
                 <PackageSearch className="h-12 w-12 text-soil-dark-300 mb-4" />
                 <p className="font-display text-lg font-bold text-soil-dark-900">No active listings</p>
                 <p className="mt-2 text-sm text-soil-dark-500 max-w-sm mb-6">
                   You don't have any produce listed for sale right now. Expand your reach by posting today's harvest.
                 </p>
                 <Link to="/post" className="inline-flex items-center gap-2 rounded-xl bg-agri-green-600 px-6 py-3 text-sm font-bold text-white shadow-floating transition-all hover:-translate-y-0.5 hover:bg-agri-green-700">
                    <PackageSearch className="h-4 w-4" /> Post Harvest
                 </Link>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {available.map((item) => (
                   <ItemCard
                     key={item.id}
                     item={item}
                     onMarkSold={handleMarkSold}
                     isAuthenticated={Boolean(currentUser)}
                     compact
                   />
                 ))}
               </div>
             )}
           </section>

           {/* Sold Section */}
           <section className="space-y-6">
             <div className="flex items-center gap-3 border-b border-soil-dark-200 pb-4">
                <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-soil-dark-100 text-soil-dark-700">
                   <Handshake className="h-4 w-4" />
                </div>
                <h3 className="text-xl font-bold text-soil-dark-950 font-display">
                  Past Sales <span className="ml-2 bg-soil-dark-100 text-soil-dark-800 text-sm px-3 py-1 rounded-full">{sold.length}</span>
                </h3>
             </div>
             
             {sold.length === 0 ? (
               <div className="rounded-3xl border border-soil-dark-100 bg-white px-6 py-12 text-center shadow-sm">
                 <Handshake className="h-10 w-10 text-soil-dark-300 mx-auto mb-3" />
                 <p className="text-sm font-medium text-soil-dark-500">
                   Your successful deals will appear here once you mark an item as Sold out.
                 </p>
               </div>
             ) : (
               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 opacity-75 grayscale-[0.2]">
                 {sold.map((item) => (
                   <ItemCard
                     key={item.id}
                     item={item}
                     onMarkSold={null}
                     isAuthenticated={Boolean(currentUser)}
                     compact
                   />
                 ))}
               </div>
             )}
           </section>
        </div>
      )}
    </div>
  );
}

export default MyItemsPage;
