import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle } from
"@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ErrandApplicant } from "@/types";
import { useNavigate } from "react-router-dom";

interface ErrandApplicantsListProps {
  errandId: string;
  applicants: ErrandApplicant[];
  isRequester: boolean;
  onAcceptApplicant: (applicantId: string) => Promise<void>;
  onRejectApplicant: (applicantId: string) => Promise<void>;
  onMessageApplicant: (applicant: ErrandApplicant) => void;
}

const ErrandApplicantsList = ({
  errandId,
  applicants,
  isRequester,
  onAcceptApplicant,
  onRejectApplicant,
  onMessageApplicant
}: ErrandApplicantsListProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [isViewingMessage, setIsViewingMessage] = useState<ErrandApplicant | null>(null);

  const handleAccept = async (applicantId: string) => {
    setLoading(applicantId);
    try {
      await onAcceptApplicant(applicantId);
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (applicantId: string) => {
    setLoading(applicantId);
    try {
      await onRejectApplicant(applicantId);
    } finally {
      setLoading(null);
    }
  };

  if (applicants.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
          <CardDescription>People who want to help with this errand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8" data-id="q73bauhbd" data-path="src/components/errands/ErrandApplicantsList.tsx">
            <p className="text-gray-500 mb-2" data-id="69tsslu3c" data-path="src/components/errands/ErrandApplicantsList.tsx">No one has applied to this errand yet</p>
            <p className="text-sm text-gray-400" data-id="nqaq77d52" data-path="src/components/errands/ErrandApplicantsList.tsx">Check back later or share this errand with others</p>
          </div>
        </CardContent>
      </Card>);

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants ({applicants.length})</CardTitle>
        <CardDescription>People who want to help with this errand</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" data-id="zl31oxldy" data-path="src/components/errands/ErrandApplicantsList.tsx">
          {applicants.map((applicant) =>
          <div
            key={applicant.id}
            className="border rounded-lg p-4 hover:border-blue-200 transition-colors" data-id="pgqbzkk3t" data-path="src/components/errands/ErrandApplicantsList.tsx">

              <div className="flex items-center justify-between" data-id="k8neg0acz" data-path="src/components/errands/ErrandApplicantsList.tsx">
                <div className="flex items-center gap-3" data-id="xacx8qmz0" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={applicant.avatar} alt={applicant.name} />
                    <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div data-id="ufyk542un" data-path="src/components/errands/ErrandApplicantsList.tsx">
                    <h3 className="font-medium" data-id="4qlizg5nw" data-path="src/components/errands/ErrandApplicantsList.tsx">{applicant.name}</h3>
                    <div className="flex items-center text-yellow-500 mt-1" data-id="wa4jqgqpe" data-path="src/components/errands/ErrandApplicantsList.tsx">
                      {Array.from({ length: 5 }).map((_, index) =>
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill={index < Math.round(applicant.rating) ? "currentColor" : "none"}
                      stroke="currentColor" data-id="9r83p2yiz" data-path="src/components/errands/ErrandApplicantsList.tsx">

                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-id="ndx49hh43" data-path="src/components/errands/ErrandApplicantsList.tsx" />
                        </svg>
                    )}
                      <span className="text-xs ml-1 text-gray-600" data-id="o1xclssph" data-path="src/components/errands/ErrandApplicantsList.tsx">
                        ({applicant.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={
              applicant.status === 'accepted' ? 'success' :
              applicant.status === 'rejected' ? 'destructive' :
              'outline'
              }>
                  {applicant.status === 'pending' ? 'Pending' :
                applicant.status === 'accepted' ? 'Accepted' :
                'Rejected'}
                </Badge>
              </div>

              <div className="mt-3" data-id="6b83kfftq" data-path="src/components/errands/ErrandApplicantsList.tsx">
                <p className="text-sm text-gray-500" data-id="ens5nt6co" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <span className="font-medium" data-id="agv1hcgt5" data-path="src/components/errands/ErrandApplicantsList.tsx">Completed Errands:</span> {applicant.completedErrands}
                </p>
                <p className="text-sm text-gray-500" data-id="wobltlauk" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <span className="font-medium" data-id="ha35aipo3" data-path="src/components/errands/ErrandApplicantsList.tsx">Applied:</span> {new Date(applicant.appliedAt).toLocaleString()}
                </p>
              </div>

              {applicant.message &&
            <div className="mt-3 pt-3 border-t border-gray-100" data-id="v2nftpiev" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <Dialog open={isViewingMessage === applicant} onOpenChange={(open) => !open && setIsViewingMessage(null)}>
                    <DialogTrigger asChild>
                      <Button
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={() => setIsViewingMessage(applicant)}>

                        View Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Message from {applicant.name}</DialogTitle>
                        <DialogDescription>
                          Sent on {new Date(applicant.appliedAt).toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line" data-id="l0vxlq8bs" data-path="src/components/errands/ErrandApplicantsList.tsx">
                        {applicant.message}
                      </div>
                      <DialogFooter>
                        <Button
                      onClick={() => {
                        setIsViewingMessage(null);
                        onMessageApplicant(applicant);
                      }}>

                          Reply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
            }

              {isRequester && applicant.status === 'pending' &&
            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2" data-id="8mypu3o4j" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                onClick={() => handleAccept(applicant.id)}
                disabled={loading === applicant.id}>

                    {loading === applicant.id ? 'Processing...' : 'Accept'}
                  </Button>
                  <Button
                size="sm"
                variant="outline"
                onClick={() => handleReject(applicant.id)}
                disabled={loading === applicant.id}>

                    Decline
                  </Button>
                  <Button
                size="sm"
                variant="ghost"
                onClick={() => onMessageApplicant(applicant)}
                disabled={loading === applicant.id}>

                    Message
                  </Button>
                </div>
            }

              {!isRequester &&
            <div className="mt-3 pt-3 border-t border-gray-100" data-id="9hxel86y7" data-path="src/components/errands/ErrandApplicantsList.tsx">
                  <Button
                size="sm"
                variant="outline"
                onClick={() => onMessageApplicant(applicant)}>

                    Message
                  </Button>
                </div>
            }
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

};

export default ErrandApplicantsList;