import React from "react";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	Search,
} from "lucide-react";

const events = [
	{
		id: 1,
		title: "Tech Conference 2025",
		description:
			"Annual technology conference featuring the latest innovations in AI and machine learning.",
		date: "Nov 15, 2025",
		time: "09:00",
		location: "Convention Center, San Francisco",
		participants: "0 / 500",
	},
	{
		id: 2,
		title: "Community Networking Meetup",
		description: "Connect with local professionals and expand your network.",
		date: "Oct 20, 2025",
		time: "18:30",
		location: "Downtown Coffee Shop",
		participants: "0 / 30",
	},
	{
		id: 3,
		title: "Design Workshop",
		description: "Hands-on workshop covering modern UI/UX design principles.",
		date: "Oct 25, 2025",
		time: "14:00",
		location: "Creative Space Studio",
		participants: "0 / 20",
		isBlueTitle: true, // Specific highlight for the third card in your image
	},
];

const HomePage: React.FC = () => {
	return (
		<div className="min-h-screen bg-white text-slate-900 font-sans">
			{/* --- Header Section --- */}
			<main className="max-w-7xl mx-auto px-8 py-12">
				<h1 className="text-4xl font-bold mb-2">Discover Events</h1>
				<p className="text-slate-500 text-lg mb-8">
					Find and join exciting events happening around you
				</p>

				{/* --- Search Bar --- */}
				<div className="relative max-w-sm mb-12">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						size={18}
					/>
					<input
						type="text"
						placeholder="Search events..."
						className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
					/>
				</div>

				{/* --- Event Cards Grid --- */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event) => (
						<div
							key={event.id}
							className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
						>
							<div>
								<h3
									className={`text-xl font-bold mb-3 ${event.isBlueTitle ? "text-indigo-600" : "text-slate-800"}`}
								>
									{event.title}
								</h3>
								<p className="text-slate-500 text-sm leading-relaxed mb-6">
									{event.description}
								</p>

								<div className="space-y-3 mb-8">
									<div className="flex items-center text-slate-400 text-sm">
										<Calendar size={16} className="mr-3" />
										<span>{event.date}</span>
									</div>
									<div className="flex items-center text-slate-400 text-sm">
										<Clock size={16} className="mr-3" />
										<span>{event.time}</span>
									</div>
									<div className="flex items-center text-slate-400 text-sm">
										<MapPin size={16} className="mr-3" />
										<span>{event.location}</span>
									</div>
									<div className="flex items-center text-slate-400 text-sm">
										<Users size={16} className="mr-3" />
										<span>{event.participants} participants</span>
									</div>
								</div>
							</div>

							<button
								type="button"
								className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
							>
								Join Event
							</button>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export { HomePage };
