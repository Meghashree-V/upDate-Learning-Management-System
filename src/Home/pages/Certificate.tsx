import { Award, Download, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const certificateData = {
  studentName: "",
  courseName: "",
  instructor: "",
  completionDate: "",
  certificateId: "",
  duration: "",
  grade: ""
};

const Certificate = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Certificate of Completion</h1>
        <p className="text-muted-foreground">Congratulations on completing your course!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Certificate Preview */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden shadow-strong">
            <CardContent className="p-0">
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-white to-lms-red-light p-12 relative">
                {/* Decorative Border */}
                <div className="absolute inset-4 border-4 border-primary/20 rounded-lg"></div>
                
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-primary mb-2">Certificate of Completion</h1>
                  <div className="w-32 h-1 bg-gradient-primary mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-6 relative z-10">
                  <p className="text-lg text-muted-foreground">This is to certify that</p>
                  
                  <h2 className="text-5xl font-bold text-foreground">{certificateData.studentName || "Student Name"}</h2>
                  
                  <p className="text-lg text-muted-foreground">has successfully completed the course</p>
                  
                  <h3 className="text-3xl font-semibold text-primary">{certificateData.courseName || "Course Name"}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Course Duration</p>
                      <p className="font-semibold text-lg">{certificateData.duration || "—"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Grade Achieved</p>
                      <p className="font-semibold text-lg text-green-600">{certificateData.grade || "—"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <p className="font-semibold text-lg">{certificateData.completionDate || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end pt-12 relative z-10">
                  <div className="text-center">
                    <div className="w-48 border-b-2 border-primary mb-2"></div>
                    <p className="font-semibold">{certificateData.instructor || "Authorized Instructor"}</p>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-xl">U</span>
                    </div>
                    <p className="font-semibold text-primary">upDate</p>
                    <p className="text-xs text-muted-foreground">Industry Oriented Learning</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-48 border-b-2 border-primary mb-2"></div>
                    <p className="font-semibold">Authorized Signatory</p>
                    <p className="text-sm text-muted-foreground">Academic Office</p>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="text-center mt-8 relative z-10">
                  <p className="text-xs text-muted-foreground">
                    Certificate ID: {certificateData.certificateId || "—"}
                  </p>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-repeat" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6 space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Certificate Earned!</h3>
                <p className="text-sm text-muted-foreground">Completed on {certificateData.completionDate || "—"}</p>
              </div>

              <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-white">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Certificate
              </Button>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Certificate Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">{certificateData.courseName || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{certificateData.duration || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade:</span>
                    <span className="font-medium text-green-600">{certificateData.grade || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate ID:</span>
                    <span className="font-medium text-xs">{certificateData.certificateId || "—"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Verification</h4>
                <p className="text-xs text-muted-foreground">
                  This certificate can be verified using the certificate ID on our verification portal.
                </p>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                  Verify Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Certificate;