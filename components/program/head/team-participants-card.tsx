"use client";
import { TeamForEvent } from "@/types";
import { Users, User, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamParticipantsCardProps {
  team: TeamForEvent;
}

const TeamParticipantsCard = ({ team }: TeamParticipantsCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Team Header */}
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <Users className="text-gray-500 mr-2" size={18} />
          Team {team.teamKey}
        </CardTitle>
      </CardHeader>

      {/* Team Participants */}
      <CardContent>
        <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
          <User size={16} className="mr-2" />
          Participants ({team.Participant.length})
        </h4>

        <div className="space-y-3">
          {team.Participant.map((participant) => (
            <div
              key={participant.userId}
              className="flex items-center p-3 rounded-md border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {participant.User.name
                    ? participant.User.name[0].toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {participant.User.name || "Unnamed User"}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Mail size={14} className="mr-1" />
                  {participant.User.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamParticipantsCard;
