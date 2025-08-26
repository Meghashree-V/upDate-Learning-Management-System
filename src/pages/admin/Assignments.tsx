import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createAssignment, deleteAssignment, gradeSubmission, listAssignments, listSubmissions, updateAssignment, type AssignmentDTO, type CreateAssignmentInput, type SubmissionDTO, type UpdateAssignmentInput } from '@/api/assignments';

function emptyForm(): CreateAssignmentInput {
  return { title: '', description: '', courseId: '', dueDate: '', maxScore: 100, published: false };
}

export default function AdminAssignmentsPage() {
  const qc = useQueryClient();
  const [filterCourseId, setFilterCourseId] = useState('');
  const [editing, setEditing] = useState<AssignmentDTO | null>(null);
  const [form, setForm] = useState<CreateAssignmentInput>(emptyForm());
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentDTO | null>(null);
  const [gradePayload, setGradePayload] = useState<{ score?: number; feedback?: string }>({});

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ['assignments', { courseId: filterCourseId || undefined }],
    queryFn: () => listAssignments({ courseId: filterCourseId || undefined }),
  });

  const createMut = useMutation({
    mutationFn: createAssignment,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['assignments'] }); setForm(emptyForm()); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAssignmentInput }) => updateAssignment(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['assignments'] }); setEditing(null); },
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteAssignment(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['assignments'] }); },
  });

  const { data: submissions = [], refetch: refetchSubs } = useQuery({
    queryKey: ['submissions', { assignmentId: selectedAssignment?._id }],
    queryFn: () => listSubmissions(selectedAssignment!._id),
    enabled: !!selectedAssignment?._id,
  });

  const gradeMut = useMutation({
    mutationFn: ({ assignmentId, submissionId, payload }: { assignmentId: string; submissionId: string; payload: { score?: number; feedback?: string } }) =>
      gradeSubmission(assignmentId, submissionId, payload),
    onSuccess: () => { refetchSubs(); setGradePayload({}); },
  });

  const startEdit = (a: AssignmentDTO) => setEditing(a);

  const submitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateAssignmentInput = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
    };
    createMut.mutate(payload);
  };

  const submitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const payload: UpdateAssignmentInput = {
      title: (document.getElementById('edit_title') as HTMLInputElement)?.value,
      description: (document.getElementById('edit_description') as HTMLTextAreaElement)?.value,
      courseId: (document.getElementById('edit_courseId') as HTMLInputElement)?.value,
      dueDate: (document.getElementById('edit_dueDate') as HTMLInputElement)?.value || undefined,
      maxScore: Number((document.getElementById('edit_maxScore') as HTMLInputElement)?.value) || undefined,
      published: (document.getElementById('edit_published') as HTMLInputElement)?.checked,
    };
    if (payload.dueDate) payload.dueDate = new Date(payload.dueDate).toISOString();
    updateMut.mutate({ id: editing._id, payload });
  };

  const grade = (submissionId: string) => {
    if (!selectedAssignment) return;
    gradeMut.mutate({ assignmentId: selectedAssignment._id, submissionId, payload: gradePayload });
  };

  useEffect(() => {
    if (!editing) return;
    (document.getElementById('edit_title') as HTMLInputElement).value = editing.title;
    (document.getElementById('edit_description') as HTMLTextAreaElement).value = editing.description || '';
    (document.getElementById('edit_courseId') as HTMLInputElement).value = editing.courseId;
    (document.getElementById('edit_dueDate') as HTMLInputElement).value = editing.dueDate ? editing.dueDate.substring(0, 10) : '';
    (document.getElementById('edit_maxScore') as HTMLInputElement).value = String(editing.maxScore ?? 100);
    (document.getElementById('edit_published') as HTMLInputElement).checked = !!editing.published;
  }, [editing]);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <Input placeholder="Filter by Course ID" value={filterCourseId} onChange={(e) => setFilterCourseId(e.target.value)} />
          </div>

          <div className="overflow-x-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-left p-2">Due</th>
                  <th className="text-left p-2">Published</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td className="p-3" colSpan={5}>Loading...</td></tr>
                ) : assignments.length === 0 ? (
                  <tr><td className="p-3" colSpan={5}>No assignments</td></tr>
                ) : (
                  assignments.map(a => (
                    <tr key={a._id} className="border-t">
                      <td className="p-2">{a.title}</td>
                      <td className="p-2">{a.courseId}</td>
                      <td className="p-2">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : '-'}</td>
                      <td className="p-2">{a.published ? 'Yes' : 'No'}</td>
                      <td className="p-2 flex gap-2 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => setSelectedAssignment(a)}>Submissions</Button>
                        <Button variant="outline" size="sm" onClick={() => startEdit(a)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => { if (confirm('Delete assignment?')) deleteMut.mutate(a._id); }}>Delete</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create */}
      <Card>
        <CardHeader>
          <CardTitle>Create Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitCreate}>
            <div className="md:col-span-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <Label>Course ID</Label>
              <Input value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} required />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="date" value={form.dueDate || ''} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
            <div>
              <Label>Max Score</Label>
              <Input type="number" value={form.maxScore ?? 100} onChange={(e) => setForm({ ...form, maxScore: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2">
              <input id="create_published" type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              <Label htmlFor="create_published">Published</Label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={createMut.isPending}>Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Edit */}
      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitUpdate}>
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input id="edit_title" defaultValue={editing.title} />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea id="edit_description" defaultValue={editing.description || ''} />
              </div>
              <div>
                <Label>Course ID</Label>
                <Input id="edit_courseId" defaultValue={editing.courseId} />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input id="edit_dueDate" type="date" defaultValue={editing.dueDate ? editing.dueDate.substring(0, 10) : ''} />
              </div>
              <div>
                <Label>Max Score</Label>
                <Input id="edit_maxScore" type="number" defaultValue={String(editing.maxScore ?? 100)} />
              </div>
              <div className="flex items-center gap-2">
                <input id="edit_published" type="checkbox" defaultChecked={!!editing.published} />
                <Label htmlFor="edit_published">Published</Label>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" disabled={updateMut.isPending}>Save</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Submissions */}
      {selectedAssignment && (
        <Card>
          <CardHeader>
            <CardTitle>Submissions — {selectedAssignment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2">Student</th>
                    <th className="text-left p-2">Submitted</th>
                    <th className="text-left p-2">Score</th>
                    <th className="text-left p-2">Feedback</th>
                    <th className="text-left p-2">File</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(submissions || []).length === 0 ? (
                    <tr><td className="p-3" colSpan={6}>No submissions</td></tr>
                  ) : (
                    submissions.map((s: SubmissionDTO) => (
                      <tr key={s._id} className="border-t">
                        <td className="p-2">{s.studentId}</td>
                        <td className="p-2">{new Date(s.submittedAt).toLocaleString()}</td>
                        <td className="p-2">{s.score ?? '-'}</td>
                        <td className="p-2">{s.feedback ?? '-'}</td>
                        <td className="p-2">{s.file ? (<a className="text-primary underline" href={s.file} target="_blank">File</a>) : '-'}</td>
                        <td className="p-2">
                          <div className="flex gap-2 flex-wrap items-center">
                            <Input placeholder="Score" type="number" className="w-24" onChange={(e) => setGradePayload(p => ({ ...p, score: Number(e.target.value) }))} />
                            <Input placeholder="Feedback" className="w-48" onChange={(e) => setGradePayload(p => ({ ...p, feedback: e.target.value }))} />
                            <Button size="sm" onClick={() => grade(s._id)} disabled={gradeMut.isPending}>Save</Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <Button variant="outline" onClick={() => setSelectedAssignment(null)}>Close</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
