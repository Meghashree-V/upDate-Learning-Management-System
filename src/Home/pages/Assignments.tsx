import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listAssignments, submitAssignment, getMySubmission, type AssignmentDTO, type SubmissionDTO } from "@/api/assignments";

export default function StudentAssignments() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("");
  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments", { published: true }],
    queryFn: () => listAssignments({ published: true }),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const submitMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { answers?: any; file?: File | null } }) => submitAssignment(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["my-submission", id] });
    },
  });

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return assignments;
    return assignments.filter(a => `${a.title} ${a.description ?? ""}`.toLowerCase().includes(q));
  }, [filter, assignments]);

  const submit = (a: AssignmentDTO) => {
    submitMut.mutate({ id: a._id, payload: { answers: answers[a._id] ? { text: answers[a._id] } : undefined, file: files[a._id] ?? null } });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">View and submit your assignments.</p>
      </div>

      <div className="flex items-center gap-3">
        <Input placeholder="Search assignments" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-muted-foreground">No assignments available.</div>
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
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{a.description || "No description"}</p>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-sm mb-1">Your Answer (optional)</p>
                    <Textarea value={answers[a._id] || ""} onChange={(e) => setAnswers(prev => ({ ...prev, [a._id]: e.target.value }))} rows={4} />
                  </div>
                  <div>
                    <p className="text-sm mb-1">Upload File (optional)</p>
                    <Input type="file" onChange={(e) => setFiles(prev => ({ ...prev, [a._id]: e.target.files?.[0] ?? null }))} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={() => submit(a)} disabled={submitMut.isPending} className="h-9 px-3">Submit</Button>
                </div>

                <MySubmission assignmentId={a._id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function MySubmission({ assignmentId }: { assignmentId: string }) {
  const { data, isLoading } = useQuery<SubmissionDTO>({
    queryKey: ["my-submission", assignmentId],
    queryFn: () => getMySubmission(assignmentId),
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <div className="text-sm text-muted-foreground">Checking submission…</div>;
  if (!data) return <div className="text-sm text-muted-foreground">No submission yet.</div>;
  return (
    <div className="text-sm text-muted-foreground">
      Submitted at {new Date(data.submittedAt).toLocaleString()} • Score: {data.score ?? "—"} {data.feedback ? `• Feedback: ${data.feedback}` : ""}
    </div>
  );
}
