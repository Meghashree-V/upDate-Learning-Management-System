import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listAssignments, getMySubmission, type AssignmentDTO, type SubmissionDTO } from "@/api/assignments";

export default function StudentResults() {
  const [filter, setFilter] = useState("");
  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments", { published: true }],
    queryFn: () => listAssignments({ published: true }),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return assignments;
    return assignments.filter(a => `${a.title} ${a.description ?? ""}`.toLowerCase().includes(q));
  }, [filter, assignments]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Results</h1>
        <p className="text-muted-foreground">See your submission status and scores.</p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search assignments" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground">No assignments found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a: AssignmentDTO) => (
            <Card key={a._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{a.title}</span>
                  <span className="text-sm text-muted-foreground">Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "—"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MySubmissionStatus assignmentId={a._id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function MySubmissionStatus({ assignmentId }: { assignmentId: string }) {
  const { data, isLoading, isError } = useQuery<SubmissionDTO>({
    queryKey: ["my-submission", assignmentId],
    queryFn: () => getMySubmission(assignmentId),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div className="text-sm text-muted-foreground">Loading status…</div>;
  if (isError || !data) return <div className="text-sm text-muted-foreground">Not submitted.</div>;
  return (
    <div className="text-sm text-muted-foreground">
      Submitted {new Date(data.submittedAt).toLocaleString()} • Status: {data.status}
      {" • Score: "}{data.score ?? "—"}
      {data.feedback ? ` • Feedback: ${data.feedback}` : ""}
    </div>
  );
}
