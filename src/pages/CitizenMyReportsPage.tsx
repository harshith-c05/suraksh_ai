import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { HazardReport, ReportStatus } from '../types';
import { StatusBadge, UrgencyBadge } from '../components/common/Badge';
import {
  PlusCircle,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  MapPin,
  ChevronRight,
  X,
  Calendar,
  Building,
  Eye,
  Image as ImageIcon,
  ArrowLeft,
  Shield,
} from 'lucide-react';

const STATUS_STEPS: { status: ReportStatus; label: string }[] = [
  { status: 'submitted', label: 'Submitted' },
  { status: 'under_review', label: 'Under Review' },
  { status: 'verified', label: 'Verified' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'resolved', label: 'Resolved' },
];

const STATUS_ORDER: Record<ReportStatus, number> = {
  submitted: 0,
  under_review: 1,
  verified: 2,
  in_progress: 3,
  resolved: 4,
  rejected: 5,
};

function StatusTimeline({ status }: { status: ReportStatus }) {
  const currentIdx = STATUS_ORDER[status] ?? 0;
  const isRejected = status === 'rejected';

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 text-red-400 text-xs font-medium py-3">
        <X className="w-4 h-4" />
        <span>This report was rejected by the reviewing authority.</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-start gap-0 mt-4 overflow-x-auto pb-1">
      {STATUS_STEPS.map((step, idx) => {
        const done = idx <= currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step.status} className="flex flex-col items-center flex-1 min-w-[80px]">
            <div className="relative flex items-center w-full">
              {idx > 0 && (
                <div className={`h-0.5 flex-1 ${done ? 'bg-brand-emerald' : 'bg-slate-700'} transition-colors`} />
              )}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                  active
                    ? 'bg-brand-emerald border-brand-emerald shadow-glow-emerald scale-125'
                    : done
                    ? 'bg-emerald-500/20 border-brand-emerald'
                    : 'bg-navy-950 border-slate-700'
                }`}
              >
                {done && !active ? (
                  <CheckCircle2 className="w-3 h-3 text-brand-emerald" />
                ) : active ? (
                  <span className="w-2 h-2 rounded-full bg-navy-950 block" />
                ) : null}
              </div>
              {idx < STATUS_STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 ${done && idx < currentIdx ? 'bg-brand-emerald' : 'bg-slate-700'} transition-colors`} />
              )}
            </div>
            <span
              className={`text-[9px] mt-1.5 text-center leading-tight ${
                active ? 'text-brand-emerald font-bold' : done ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ReportDetailModal({ report, onClose }: { report: HazardReport; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-surface-card border border-slate-700/60 rounded-3xl shadow-2xl animate-fadeInUp overflow-y-auto max-h-[90vh]">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                {report.id}
              </span>
              <UrgencyBadge urgency={report.urgency} />
              <StatusBadge status={report.status} />
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{report.categoryLabel}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{report.resolvedAddress}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Report Progress
            </h3>
            <StatusTimeline status={report.status} />
          </div>

          <div className="bg-navy-950/60 rounded-2xl p-4 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Your Description
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">{report.description}</p>
          </div>

          {report.imageUrl && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
                Photographic Evidence
              </h3>
              <img
                src={report.imageUrl}
                alt="Hazard evidence"
                className="w-full h-48 object-cover rounded-2xl border border-slate-800"
              />
            </div>
          )}

          {report.verification && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-emerald mb-3 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                Official Response
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">Reviewed by:</span>
                  <span>{report.verification.verifiedBy}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">Verified at:</span>
                  <span>{new Date(report.verification.verifiedAt).toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-navy-950/60 rounded-xl p-3 mt-2">
                  <p className="font-semibold text-slate-300 mb-1">Official Notes:</p>
                  <p className="text-slate-400 leading-relaxed">{report.verification.officialNotes}</p>
                </div>
                {report.verification.actionTaken && (
                  <div className="bg-emerald-500/10 rounded-xl p-3">
                    <p className="font-semibold text-brand-emerald mb-1">Action Taken:</p>
                    <p className="text-emerald-300">{report.verification.actionTaken}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-navy-950/60 rounded-xl p-3 border border-slate-800">
              <p className="text-slate-500 mb-1">Submitted</p>
              <p className="text-slate-200 font-medium">
                {new Date(report.createdAt).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-navy-950/60 rounded-xl p-3 border border-slate-800">
              <p className="text-slate-500 mb-1">Last Updated</p>
              <p className="text-slate-200 font-medium">
                {new Date(report.updatedAt).toLocaleString('en-IN')}
              </p>
            </div>
            {report.assignedTeam && (
              <div className="col-span-2 bg-navy-950/60 rounded-xl p-3 border border-slate-800">
                <p className="text-slate-500 mb-1">Assigned Team</p>
                <p className="text-slate-200 font-medium">{report.assignedTeam}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const CitizenMyReportsPage: React.FC = () => {
  const { reports } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null);

  // In demo mode, show all reports; in production this would be filtered by userId
  const myReports = useMemo(() => reports, [reports]);

  const filteredReports = useMemo(() => {
    return myReports.filter((r) => {
      const matchSearch =
        !searchQuery ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.resolvedAddress.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'all' || r.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [myReports, searchQuery, filterStatus]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: myReports.length };
    myReports.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    return counts;
  }, [myReports]);

  const STATUS_FILTERS: { value: ReportStatus | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'text-slate-300' },
    { value: 'submitted', label: 'Submitted', color: 'text-blue-400' },
    { value: 'under_review', label: 'Under Review', color: 'text-yellow-400' },
    { value: 'verified', label: 'Verified', color: 'text-cyan-400' },
    { value: 'in_progress', label: 'In Progress', color: 'text-orange-400' },
    { value: 'resolved', label: 'Resolved', color: 'text-emerald-400' },
    { value: 'rejected', label: 'Rejected', color: 'text-red-400' },
  ];

  return (
    <div className="flex-1 bg-navy-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button
                onClick={() => navigate('/citizen/dashboard')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-2xl font-black text-white tracking-tight">My Reports</h1>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30">
                {myReports.length} Total
              </span>
            </div>
            <p className="text-sm text-slate-400 ml-10">
              Track the status and official responses for all your hazard submissions
            </p>
          </div>

          <button
            onClick={() => navigate('/citizen/report')}
            className="py-2.5 px-5 bg-brand-emerald hover:bg-brand-emerald-hover text-slate-950 font-bold rounded-xl text-sm transition-all shadow-glow-emerald flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            New Report
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Submitted', status: 'submitted', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Under Review', status: 'under_review', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
            { label: 'Verified', status: 'verified', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
            { label: 'In Progress', status: 'in_progress', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
            { label: 'Resolved', status: 'resolved', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map((item) => (
            <button
              key={item.status}
              onClick={() => setFilterStatus(item.status as ReportStatus)}
              className={`rounded-2xl p-3 border transition-all text-left ${item.bg} ${
                filterStatus === item.status
                  ? 'ring-2 ring-offset-2 ring-offset-navy-950 ring-offset-transparent ring-current scale-105'
                  : 'hover:brightness-125'
              } ${item.color}`}
            >
              <div className="text-2xl font-black">{statusCounts[item.status] || 0}</div>
              <div className="text-[11px] font-semibold mt-0.5 opacity-80">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, category or address…"
              className="w-full pl-10 pr-4 py-2.5 bg-surface-card border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-brand-emerald transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 bg-surface-card border border-slate-700/60 rounded-xl p-1 flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterStatus(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === f.value ? `${f.color} bg-slate-800` : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f.label}
                {statusCounts[f.value as string] !== undefined && (
                  <span className="ml-1.5 opacity-70">({statusCounts[f.value as string] || 0})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reports list */}
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <FileText className="w-12 h-12 mb-4 opacity-30" />
            <p className="font-semibold text-lg">No reports found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
            <button
              onClick={() => navigate('/citizen/report')}
              className="mt-6 py-2.5 px-5 bg-brand-emerald text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Submit your first report
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report, i) => (
              <div
                key={report.id}
                className="bg-surface-card border border-slate-700/60 rounded-2xl p-4 hover:border-slate-600 transition-all cursor-pointer group"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Image thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-800 border border-slate-700">
                      {report.imageUrl ? (
                        <img src={report.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-slate-600" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded">
                          {report.id}
                        </span>
                        <UrgencyBadge urgency={report.urgency} />
                        <StatusBadge status={report.status} />
                      </div>

                      <p className="font-bold text-white text-sm truncate">{report.categoryLabel}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{report.resolvedAddress}</span>
                      </div>

                      <StatusTimeline status={report.status} />
                    </div>
                  </div>

                  {/* Meta + action */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(report.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {report.verification && (
                      <div className="flex items-center gap-1 text-[11px] text-brand-emerald">
                        <Shield className="w-3 h-3" />
                        <span>Official response</span>
                      </div>
                    )}
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-cyan transition-colors group-hover:text-brand-cyan">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedReport && (
        <ReportDetailModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  );
};

export default CitizenMyReportsPage;
